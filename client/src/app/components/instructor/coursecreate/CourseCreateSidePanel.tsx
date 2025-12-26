// app/coursecreate/components/CourseCreateSidePanel.tsx
import { CheckCircle2, Image as ImgIcon, Upload, Sparkles } from "lucide-react";

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
          {icon}
        </span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="text-sm text-slate-600">{children}</div>
    </div>
  );
}

export default function CourseCreateSidePanel() {
  return (
    <div className="space-y-6">
      <Card title="Publishing checklist" icon={<CheckCircle2 size={18} />}>
        <ul className="list-disc space-y-2 pl-5">
          <li>Tiêu đề rõ ràng, có từ khóa chính</li>
          <li>Chọn đúng Category + Sub-category</li>
          <li>Output (kết quả) cụ thể, đo được</li>
          <li>Giá & thời lượng hợp lý</li>
        </ul>
      </Card>

      <Card title="Cover image guide" icon={<ImgIcon size={18} />}>
        <ul className="list-disc space-y-2 pl-5">
          <li>Ảnh rõ, không mờ (khuyến nghị 1280×720)</li>
          <li>Tránh quá nhiều chữ trên ảnh</li>
          <li>Ưu tiên phong cách đồng nhất brand</li>
        </ul>
      </Card>

      <Card title="Video upload notes" icon={<Upload size={18} />}>
        <ul className="list-disc space-y-2 pl-5">
          <li>Đặt tên video theo nội dung bài</li>
          <li>Tick “Free trial” nếu muốn cho xem thử</li>
          <li>Order tăng dần để đúng thứ tự</li>
        </ul>
      </Card>

      <Card title="Tips để bán tốt" icon={<Sparkles size={18} />}>
        <div className="space-y-2">
          <p>• Description nên có: mục tiêu → đối tượng → nội dung → lợi ích.</p>
          <p>• Output viết dạng “Sau khóa học, học viên có thể…”</p>
          <p>• Tên khóa học nên ngắn, mạnh, rõ lợi ích.</p>
        </div>
      </Card>
    </div>
  );
}
