"use client";

import React, { useMemo, useRef, useState } from "react";
import { GripVertical, Plus, Upload, X } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type VideoItem = {
  id: string;
  name: string;
  order: number;
  isChecked: boolean;
  duration?: string;
  url?: string;
};

type Lecture = {
  id: string;
  name: string;
  order: number;
  videos: VideoItem[];
};

function cn(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

// helpers
const lecKey = (lectureId: string) => `lec:${lectureId}`;
const vidKey = (lectureId: string, videoId: string) => `vid:${lectureId}:${videoId}`;

function parseLectureKey(id: string) {
  return id.startsWith("lec:") ? id.slice(4) : null;
}
function parseVideoKey(id: string) {
  if (!id.startsWith("vid:")) return null;
  const parts = id.split(":");
  if (parts.length < 3) return null;
  return { lectureId: parts[1], videoId: parts.slice(2).join(":") };
}

function SortableCard({
  id,
  className,
  children,
  renderHandle,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  renderHandle?: (args: { attributes: any; listeners: any }) => React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        isDragging && "opacity-70",
        className
      )}
    >
      {renderHandle?.({ attributes, listeners })}
      {/* nếu không dùng handle thì fallback drag toàn khối */}
      {!renderHandle ? (
        <div {...attributes} {...listeners}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

export default function LectureVideoManager({
  lectures,
  setLectures,
  addNewLecture,
  removeLecture,
  addVideo,
  removeVideo,
  toggleVideoCheck,
  handleVideoUploadClick,
  handleVideoFileSelect,
  fileInputsRef,
  formatDuration,
}: {
  lectures: Lecture[];
  setLectures: React.Dispatch<React.SetStateAction<Lecture[]>>;
  addNewLecture: () => void;
  removeLecture: (lectureId: string) => void;
  addVideo: (lectureId: string) => void;
  removeVideo: (lectureId: string, videoId: string) => void;
  toggleVideoCheck: (lectureId: string, videoId: string) => void;
  handleVideoUploadClick: (lectureId: string, videoId: string) => void;
  handleVideoFileSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    lectureId: string,
    videoId: string
  ) => void;
  fileInputsRef: React.MutableRefObject<Record<string, HTMLInputElement | null>>;
  formatDuration: (d: string) => string;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const [selected, setSelected] = useState<{ lectureId: string; videoId: string } | null>(null);

  const selectedVideo = useMemo(() => {
    if (!selected) return null;
    const lec = lectures.find((l) => l.id === selected.lectureId);
    const vid = lec?.videos.find((v) => v.id === selected.videoId);
    return { lec, vid };
  }, [selected, lectures]);

  const lectureIds = useMemo(() => lectures.map((l) => lecKey(l.id)), [lectures]);

  function moveVideoAcrossLectures(
    fromLectureId: string,
    toLectureId: string,
    fromVideoId: string,
    toIndex: number
  ) {
    setLectures((prev) => {
      const copy = structuredClone(prev) as Lecture[];
      const fromL = copy.find((l) => l.id === fromLectureId);
      const toL = copy.find((l) => l.id === toLectureId);
      if (!fromL || !toL) return prev;

      const fromIndex = fromL.videos.findIndex((v) => v.id === fromVideoId);
      if (fromIndex < 0) return prev;

      const [moved] = fromL.videos.splice(fromIndex, 1);
      toL.videos.splice(Math.max(0, toIndex), 0, moved);

      // cập nhật order
      fromL.videos = fromL.videos.map((v, i) => ({ ...v, order: i + 1 }));
      toL.videos = toL.videos.map((v, i) => ({ ...v, order: i + 1 }));

      return copy;
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeVid = parseVideoKey(String(active.id));
    if (!activeVid) return;

    const overVid = parseVideoKey(String(over.id));
    if (!overVid) return;

    if (activeVid.lectureId === overVid.lectureId) return;

    // kéo video sang lecture khác, chèn vào vị trí của video đang hover
    const targetLecture = lectures.find((l) => l.id === overVid.lectureId);
    if (!targetLecture) return;
    const toIndex = targetLecture.videos.findIndex((v) => v.id === overVid.videoId);
    if (toIndex < 0) return;

    moveVideoAcrossLectures(activeVid.lectureId, overVid.lectureId, activeVid.videoId, toIndex);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const aId = String(active.id);
    const oId = String(over.id);

    // 1) reorder lectures
    const activeLectureId = parseLectureKey(aId);
    const overLectureId = parseLectureKey(oId);
    if (activeLectureId && overLectureId) {
      if (activeLectureId === overLectureId) return;

      const oldIndex = lectures.findIndex((l) => l.id === activeLectureId);
      const newIndex = lectures.findIndex((l) => l.id === overLectureId);
      if (oldIndex < 0 || newIndex < 0) return;

      setLectures((prev) =>
        arrayMove(prev, oldIndex, newIndex).map((l, i) => ({ ...l, order: i + 1 }))
      );
      return;
    }

    // 2) reorder videos trong cùng lecture
    const activeVid = parseVideoKey(aId);
    const overVid = parseVideoKey(oId);
    if (!activeVid || !overVid) return;

    if (activeVid.lectureId !== overVid.lectureId) return; // cross-lecture đã xử lý ở onDragOver

    const lec = lectures.find((l) => l.id === activeVid.lectureId);
    if (!lec) return;

    const oldIndex = lec.videos.findIndex((v) => v.id === activeVid.videoId);
    const newIndex = lec.videos.findIndex((v) => v.id === overVid.videoId);
    if (oldIndex < 0 || newIndex < 0) return;

    setLectures((prev) => {
      const copy = structuredClone(prev) as Lecture[];
      const target = copy.find((l) => l.id === activeVid.lectureId);
      if (!target) return prev;
      target.videos = arrayMove(target.videos, oldIndex, newIndex).map((v, i) => ({
        ...v,
        order: i + 1,
      }));
      return copy;
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* LEFT: manager */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Lecture & Video</h2>
            <p className="text-sm text-slate-500">Kéo thả để đổi thứ tự, kéo video qua lecture khác.</p>
          </div>

          <button
            type="button"
            onClick={addNewLecture}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} />
            Add lecture
          </button>
        </div>

        {lectures.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <div className="text-sm font-semibold text-slate-900">Chưa có lecture nào</div>
            <div className="mt-1 text-sm text-slate-600">Bấm “Add lecture” để tạo lecture đầu tiên.</div>
            <button
              type="button"
              onClick={addNewLecture}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <Plus size={16} />
              Add first lecture
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={lectureIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {lectures.map((lecture) => {
                  const lectureSortableId = lecKey(lecture.id);
                  const videoSortableIds = lecture.videos.map((v) => vidKey(lecture.id, v.id));

                  return (
                    <SortableCard
                      key={lectureSortableId}
                      id={lectureSortableId}
                      className="p-4"
                      renderHandle={({ attributes, listeners }) => (
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                              title="Drag lecture"
                              {...attributes}
                              {...listeners}
                            >
                              <GripVertical size={16} />
                            </button>

                            <span className="text-xs font-semibold uppercase text-slate-500">
                              Lecture #{lecture.order}
                            </span>

                            <input
                              value={lecture.name}
                              onChange={(e) =>
                                setLectures((prev) =>
                                  prev.map((l) => (l.id === lecture.id ? { ...l, name: e.target.value } : l))
                                )
                              }
                              className="w-full max-w-[420px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                              placeholder="Lecture title"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeLecture(lecture.id)}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-red-600 hover:bg-red-50"
                            title="Remove lecture"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    >
                      {/* Videos */}
                      <SortableContext items={videoSortableIds} strategy={verticalListSortingStrategy}>
                        <div className="space-y-2">
                          {lecture.videos.map((video) => {
                            const videoSortableId = vidKey(lecture.id, video.id);

                            return (
                              <SortableCard
                                key={videoSortableId}
                                id={videoSortableId}
                                className="bg-slate-50 p-3"
                                renderHandle={({ attributes, listeners }) => (
                                  <div className="flex items-center justify-between gap-2">
                                    <button
                                      type="button"
                                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                      title="Drag video"
                                      {...attributes}
                                      {...listeners}
                                    >
                                      <GripVertical size={16} />
                                    </button>

                                    <div className="ml-auto flex items-center gap-2">
                                      <button
                                        type="button"
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                        onClick={() => handleVideoUploadClick(lecture.id, video.id)}
                                        title="Upload video"
                                      >
                                        <Upload size={16} />
                                      </button>

                                      <input
                                        type="file"
                                        accept="video/*"
                                        ref={(el) => {
                                          fileInputsRef.current[`${lecture.id}-${video.id}`] = el;
                                        }}
                                        onChange={(e) => handleVideoFileSelect(e, lecture.id, video.id)}
                                        className="hidden"
                                      />

                                      <button
                                        type="button"
                                        onClick={() => removeVideo(lecture.id, video.id)}
                                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-red-600 hover:bg-red-50"
                                        title="Remove video"
                                      >
                                        <X size={16} />
                                      </button>
                                    </div>
                                  </div>
                                )}
                              >
                                <button
                                  type="button"
                                  onClick={() => setSelected({ lectureId: lecture.id, videoId: video.id })}
                                  className={cn(
                                    "mt-2 w-full rounded-xl p-2 text-left transition",
                                    selected?.videoId === video.id && selected?.lectureId === lecture.id
                                      ? "ring-2 ring-blue-500/30"
                                      : "hover:bg-white"
                                  )}
                                >
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="text-sm font-semibold text-slate-900">
                                      {video.name || "Untitled video"}
                                    </div>
                                    {video.duration && (
                                      <span className="text-xs text-slate-500">{formatDuration(video.duration)}</span>
                                    )}
                                  </div>

                                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-600">
                                    <label className="inline-flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={video.isChecked}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          toggleVideoCheck(lecture.id, video.id);
                                        }}
                                        className="h-4 w-4 accent-blue-600"
                                      />
                                      Free trial
                                    </label>
                                    <span>Order: {video.order}</span>
                                  </div>
                                </button>
                              </SortableCard>
                            );
                          })}
                        </div>
                      </SortableContext>

                      <button
                        type="button"
                        onClick={() => addVideo(lecture.id)}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <Plus size={16} />
                        Add video
                      </button>
                    </SortableCard>
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* RIGHT: preview */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Preview</div>
          <p className="mt-1 text-xs text-slate-500">Chọn 1 video để xem trước.</p>

          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            {selectedVideo?.vid?.url ? (
              <video controls src={selectedVideo.vid.url} className="h-48 w-full object-cover" />
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-slate-500">
                Chưa có URL video để preview
              </div>
            )}
          </div>

          {selectedVideo?.lec && selectedVideo?.vid && (
            <div className="mt-3 space-y-1">
              <div className="text-sm font-semibold text-slate-900">
                {selectedVideo.vid.name || "Untitled video"}
              </div>
              <div className="text-xs text-slate-600">Lecture: {selectedVideo.lec.name || "(no name)"}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
