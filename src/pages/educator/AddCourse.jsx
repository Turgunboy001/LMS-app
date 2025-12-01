import React, { useEffect, useRef, useState } from "react";
import "quill/";
import Quill from "quill";
import { assets } from "../../assets/assets";

import uniqid from "uniqid";

const AddCourse = () => {
  const quillRef = useRef();
  const editorRef = useRef();

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // const handlerChapter = (action, chapterId) => {
  //   if (action === "add") {
  //     const title = prompt("Enter Chapter Name:");
  //     if (title) {
  //       const newChapter = {
  //         chapterId: uniqid(),
  //         chapterTitle: title,
  //         chapterContent: [],
  //         collapsed: false,
  //         chapterOrder:
  //           chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
  //       };
  //       setChapters([...chapters, newChapter]);
  //     } else if (action === "remove") {
  //       setChapters(
  //         chapters.filter((chapter) => chapter.chapterId !== chapterId)
  //       );
  //     } else if (action === "toggle") {
  //       console.log("toggle");

  //       setChapters(
  //         chapters.map((chapter) =>
  //           chapter.chapterId === chapterId
  //             ? { ...chapter, collapsed: !chapter.collapsed }
  //             : chapter
  //         )
  //       );
  //     }
  //   }
  // };

  const handlerChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
      return;
    }

    if (action === "remove") {
      setChapters(chapters.filter((c) => c.chapterId !== chapterId));
      return;
    }

    if (action === "toggle") {
      setChapters(
        chapters.map((c) =>
          c.chapterId === chapterId ? { ...c, collapsed: !c.collapsed } : c
        )
      );
    }
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
    setShowPopUp(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action == "add") {
      setCurrentChapterId(chapterId);
      setShowPopUp(true);
    } else if (action == "remove") {
      setChapters(
        chapters.map((chapter) => {
          if (chapter.chapterId === chapterId) {
            chapter.chapterContent.splice(lectureIndex, 1);
          }
          return chapter;
        })
      );
    }
  };
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <div className="h-screen  overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <p>Course Title</p>
          <input
            type="text"
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Type here"
            value={courseTitle}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500 "
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              type="number"
              onChange={(e) => setCoursePrice(e.target.value)}
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
              required
              value={coursePrice}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p>Course Thmbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-blue-500 rounded"
                alt=""
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img src={image ? URL.createObjectURL(image) : ""} alt="" />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            type="number"
            onChange={(e) => setDiscount(e.target.value)}
            className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500"
            required
            value={discount}
          />
        </div>

        {/* adding chapters and lectures  */}

        <div className="">
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className="bg-white border mb-4 rounded-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    onClick={() => handlerChapter("toggle", chapter.chapterId)}
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "-rotate-90"
                    }`}
                    alt=""
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-gray-500">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  className="cursor-pointer"
                  alt=""
                  onClick={() => handlerChapter("remove", chapter.chapterId)}
                />
              </div>
              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      className="flex justify-between items-center mb-2"
                      key={lectureIndex}
                    >
                      <span>
                        {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          target="_blank"
                          className="text-blue-500"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <img
                        src={assets.cross_icon}
                        className="cursor-pointer"
                        alt=""
                        onClick={() =>
                          handleLecture(
                            "remove",
                            chapter.chapterId,
                            lectureIndex
                          )
                        }
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => handleLecture("add", chapter.chapterId)}
                    className="inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2"
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer"
            onClick={() => handlerChapter("add")}
          >
            + Add Chapter
          </div>
          {showPopUp && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-2">
                  <p>Duration (minuts)</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture Url</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border rounded py-1 px-2"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex gap-2 my-2">
                  <p>is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="mt-1  scale-125"
                    value={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>
                <button
                  className="w-full bg-blue-400 text-white px-4 py-2 rounded"
                  type="button"
                  onClick={addLecture}
                >
                  Add
                </button>
                <img
                  src={assets.cross_icon}
                  onClick={() => setShowPopUp(false)}
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                  alt=""
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-black text-white w-max py-2.5 px-8 rounded my-4"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
