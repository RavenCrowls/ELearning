import React,{ useState } from 'react';


export default function Lesson() {
     // Track which sections are open
  const [openSections, setOpenSections] = useState([0]);
  
  // Toggle a section's open/closed state
  const toggleSection = (index:number) => {
    setOpenSections(prevOpenSections => {
      if (prevOpenSections.includes(index)) {
        return prevOpenSections.filter(i => i !== index);
      } else {
        return [...prevOpenSections, index];
      }
    });
  };
  

    const sections = [
    {
      title: "Introduction",
      audioItems: [
        { title: "Introduction", duration: "03:30", locked: false },
        { title: "Introduction", duration: "03:30", locked: true },
        { title: "Introduction", duration: "03:30", locked: true }
      ]
    },
    {
      title: "Introduction",
      audioItems: [
        { title: "Introduction", duration: "03:30", locked: false },
        { title: "Introduction", duration: "03:30", locked: true }
      ]
    },
    {
      title: "Introduction",
      audioItems: [
        { title: "Introduction", duration: "03:30", locked: false },
        { title: "Introduction", duration: "03:30", locked: true },
        { title: "Introduction", duration: "03:30", locked: false }
      ]
    }
  ];
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 mt-6 md:w-[60vw] lg:w-[45vw] xl:w-[42.5vw] mx-auto">
            <h2 className="font-bold text-lg mb-3">Danh sách bài giảng</h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex 
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum.
            </p>

            <div className="w-full max-w-2xl mx-auto">
      {/* Audio Player Section */}
      <div className="w-full max-w-2xl mx-auto">
      {/* All sections */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border-b">
          <button 
            className="w-full text-left flex items-center justify-between py-4"
            onClick={() => toggleSection(sectionIndex)}
          >
            <h2 className="text-xl text-blue-600 font-medium">
              {section.title}
            </h2>
            <span>
              {/* Toggle icon */}
              {openSections.includes(sectionIndex) ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>
               : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>}
            </span>
          </button>
          
          {openSections.includes(sectionIndex) && (
            <div className="bg-blue-50 rounded-md mb-4">
              {section.audioItems.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="p-4 flex items-center justify-between border-b border-blue-100 last:border-b-0"
                >
                  <div className="flex items-center">
                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 mr-4 shadow-sm">
                      {/* Play icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>
                    </button>
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">{item.duration}</span>
                    {item.locked && (
                      <span className="text-blue-600">
                        {/* Lock icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-lock-keyhole-icon lucide-lock-keyhole"><circle cx="12" cy="16" r="1"/><rect x="3" y="10" width="18" height="12" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/></svg>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
        </div>
    );
}