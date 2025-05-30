import { toastError } from "@/common/utils/toast-actions";
import Loading from "@/components/loading";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { courseService } from "@/services/course.service";
import { Edit, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCourse } from "@/stores/courses/course";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import PrivateRoute from "@/private/private-route";

export default function Course() {
  const { id } = useParams();
  const { loading, setCourse, handleLoading, course } = useCourse();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(
    course && id ? course[id]?.title : ""
  );

  useEffect(() => {
    (async () => {
      try {
        if (!id) return toastError("Id topilmadi!");
        if (course && course[id]) return;
        handleLoading(true);
        const data = await courseService.findById(id);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        handleLoading(false);
      }
    })();
  }, [id, handleLoading, setCourse, course]);

  if (loading) {
    return <Loading />;
  }

  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-4">
        {/* Course Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {isEditingTitle ? (
                  <PrivateRoute roles={["teacher"]}>
                    <div className="flex items-center gap-2">
                      <Input
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="text-2xl font-bold"
                      />
                      <Button onClick={handleSaveTitle} size="sm">
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditingTitle(false);
                          setNewTitle(course && id ? course[id]?.subject.title : "");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </PrivateRoute>
                ) : (
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-2xl">
                      {course && id && course[id]?.subject.title}
                    </CardTitle>
                    <PrivateRoute roles={["teacher"]}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingTitle(true)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </PrivateRoute>
                  </div>
                )}
              </div>
              <Badge variant="secondary" className="ml-4">
                Active
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="p-2 rounded border shadow">
          <div className="flex items-center justify-between mb-6 p-2 border">
            <h3 className="text-xl font-bold">
              {course && id && course[id].modules?.length} ta modul
            </h3>
            <PrivateRoute roles={["teacher"]}>
              <Button variant={"outline"}>
                <Plus /> Modul qo'shish
              </Button>
            </PrivateRoute>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {course &&
              id &&
              course[id]?.modules?.map((module) => {
                return (
                  <AccordionItem
                    key={module?._id}
                    value="item-1"
                    className="mb-2 border-l-4 border-l-black rounded-l"
                  >
                    <AccordionTrigger className="pl-4 py-1 text-xl">
                      {module?.title}
                    </AccordionTrigger>
                    <AccordionContent className="border-l border-b border-r p-2 pt-0">
                      <p className="text-sm p-2 pt-0 mb-4">{module?.desc}</p>
                      <div className="flex flex-col gap-6 bg-muted p-4 rounded">
                        <PrivateRoute roles={["teacher"]}>
                          <div className="p-2 bg-white rounded flex items-center justify-between">
                            <div></div>
                            <Button className="cursor-pointer">
                              <Plus />
                              Dars qo'shish
                            </Button>
                          </div>
                        </PrivateRoute>
                        {module?.lessons?.map((lesson) => {
                          return (
                            <div key={lesson?._id} className="border bg-white">
                              <div className="border-b p-1 bg-blue-500 flex items-center justify-between px-2">
                                <p className="text-base  font-bold text-white">
                                  {lesson?.title}
                                </p>
                                <Link
                                  to={`/dashboard/courses/course/${course[id]?._id}/${lesson?._id}`}
                                  className="bg-black px-4 text-xl rounded"
                                >
                                  👀
                                </Link>
                              </div>
                              <p className="p-3">{lesson?.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </div>

        <PrivateRoute roles={["teacher"]}>
          <Table className="border">
            <TableCaption>Biriktirilgan guruhlar ro'yhati!</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="border">N#</TableHead>
                <TableHead className="border">Guruh</TableHead>
                <TableHead className="border">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {course &&
                id &&
                course[id]?.groups.map((group, i) => {
                  return (
                    <TableRow key={group._id}>
                      <TableCell className="border">{i + 1}.</TableCell>
                      <TableCell className="border uppercase">
                        {group.title}
                      </TableCell>
                      <TableCell className="border">Delete</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </PrivateRoute>
      </div>
    </div>
  );
}
