import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

interface Props {
  data: User;
}
export default function DevTree({ data }: Props) {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
    );
  }, [data]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && over.id) {
      const prevIndex = enabledLinks.findIndex((link) => link.id === active.id);
      const newIndex = enabledLinks.findIndex((link) => link.id === over.id);
      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);
      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter(
        (item: SocialNetwork) => !item.enabled
      );
      // const links = [...order, ...disabledLinks]
      const links = order.concat(disabledLinks);
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links),
        };
      });
    }
  };
  return (
    <>
      <Header />
      <div className="min-h-screen py-10 bg-gray-100">
        <main className="max-w-5xl p-10 mx-auto md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="text-2xl font-bold text-right text-slate-800"
              to={`/${data.handle}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil: /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col gap-10 mt-10 md:flex-row">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full px-5 py-10 space-y-6 md:w-96 bg-slate-800">
              <p className="text-4xl text-center text-white">{data.handle}</p>
              {data.image && (
                <img
                  className="mx-auto max-w-[250px]"
                  src={data.image}
                  alt="Imagen perfil"
                />
              )}
              <p className="text-lg font-black text-center text-white">
                {data.description}
              </p>

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <div className="flex flex-col gap-5 mt-20'">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
