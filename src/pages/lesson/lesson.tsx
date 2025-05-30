import { toastError } from "@/common/utils/toast-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { LessonData } from "@/interfaces/lesson.interface";
import type { ResourceData } from "@/interfaces/resource.interface";
import PrivateRoute from "@/private/private-route";
import { courseService } from "@/services/course.service";
import { lessonService } from "@/services/lesson.service";
import { useCourse } from "@/stores/courses/course";
import {
  BookOpenCheck,
  Download,
  Edit,
  ExternalLink,
  FileText,
  Play,
  Plus,
  Trash,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

export default function Lesson() {
  const { lessonId, courseId } = useParams();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const { course, setCourse } = useCourse();

  useEffect(() => {
    (async () => {
      try {
        if (!lessonId) return toastError("Id topilmadi!");
        const data = await lessonService.findById(lessonId);
        setLesson(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [lessonId]);

  useEffect(() => {
    (async () => {
      try {
        if (!courseId) return toastError("Kurs ID topilmadi!");

        if (!course || (course && !course[courseId])) {
          const data = await courseService.findById(courseId);
          setCourse(data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [course, courseId, setCourse]);

  const renderResource = (resource: ResourceData): ReactNode => {
    const icon = resource.type === "file" ? FileText : ExternalLink;
    const IconComponent = icon;

    return (
      <Card
        key={resource._id}
        className="hover:shadow-md transition-shadow p-2"
      >
        <CardContent className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconComponent className="h-10 w-10 text-muted-foreground" />
              <div>
                <h4 className="font-medium">{resource.title}</h4>
                <Badge variant="outline" className="mt-1">
                  {resource.type}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" asChild>
                <Link
                  to={resource.target}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.type === "file" ? (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Yuklab olish
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Ochish
                    </>
                  )}
                </Link>
              </Button>
              <PrivateRoute roles={["teacher"]}>
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="cursor-pointer"
                >
                  <Trash />
                  O'chirish
                </Button>
              </PrivateRoute>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex items-start gap-2 p-4">
      <div className="max-w-[300px] w-full bg-green-50 p-2 rounded h-screen overflow-y-auto">
        {course && courseId && course[courseId] && (
          <div>
            {course[courseId].modules?.map((module, i) => {
              return (
                <div key={module?._id} className="">
                  <h4 className="font-semibold text-lg mb-2">
                    {i + 1}) {module?.title}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {module?.lessons?.map((lessonItem, j) => {
                      return (
                        <Link
                          key={lessonItem?._id}
                          to={`/dashboard/courses/course/${courseId}/${lessonItem?._id}`}
                          className={`py-2 px-4 rounded hover:bg-green-100 transition-colors flex-1 text-start ${
                            lessonItem?._id === lessonId
                              ? "bg-green-500 font-semibold text-white hover:bg-green-600"
                              : "bg-green-50"
                          }`}
                        >
                          {j + 1}) {lessonItem?.title}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex-1 flex items-center flex-col py-6 px-4">
        <div className="text-start w-full max-w-[1300px]">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-2xl">{lesson?.title}</h3>
            <PrivateRoute roles={["teacher"]}>
              <Button className="cursor-pointer">
                <Edit />
                Tahrirlash
              </Button>
            </PrivateRoute>
          </div>
          <p>{lesson?.desc}</p>
          {lesson?.type === "video" && (
            <div className="w-full">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                    <video
                      src={lesson.target}
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                      controlsList="nodownload"
                    >
                      <source src={lesson.target} type="video/mp4" />
                      <source src={lesson.target} type="video/webm" />
                      <source src={lesson.target} type="video/ogg" />
                      Brauzeringiz video formatini qo'llab-quvvatlamaydi.
                    </video>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {lesson?.type === "file" && (
            <Card className="w-full items-start justify-start shadow-none border-none">
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Fayl yuklab olish
                  </p>
                  <Button asChild>
                    <Link
                      to={lesson.target}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Faylni yuklab olish
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {lesson?.type === "quiz" && (
            <Card className="w-full max-w-[1300px] items-start justify-start shadow-none border-none">
              <CardContent className="flex items-center justify-center p-8">
                <div className="text-center">
                  <BookOpenCheck className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Test ishlashni boshlash
                  </p>
                  <Button asChild>
                    <Link
                      to={lesson.target}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Test ishlashni boshlash
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        <div className="max-w-[1300px] w-full">
          {lesson?.resources && lesson?.resources.length > 0 && (
            <div>
              <Separator className="mb-6" />
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Qo'shimcha resurslar</h2>
                <PrivateRoute roles={["teacher"]}>
                  <Button className="cursor-pointer">
                    <Plus />
                    Resurs qo'shish
                  </Button>
                </PrivateRoute>
              </div>
              <div className="grid gap-4">
                {lesson?.resources.map((resource) => renderResource(resource))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
