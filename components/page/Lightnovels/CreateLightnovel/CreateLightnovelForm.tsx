"use client";
import React, { FC, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ClientUploadedFileData } from "uploadthing/types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tag, TagInput } from "emblor";
import { Input } from "@/components/ui/input";
import { Dropzone } from "@/components/ui/dropzone";
import { Button } from "@/components/ui/button";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";

import TiptapEditor from "@/components/shared/Editor/TiptapEditor";
import { uploadFiles } from "@/common/uploadthing/uploadthing";
import { createLightnovel } from "@/actions/lightnovel/create-lightnovel.action";
import { useClientSession } from "@/hooks/client/useClientSession";
import {
  LightnovelCreateSchema,
  lightnovelCreateSchema,
} from "@/schemas/zod/lightnovel/create-lightnovel.schema";

type IProps = {
  categories: Category[] | null;
  content?: LightnovelCreateSchema;
  edit?: boolean;
  novelId?: string;
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateLightnovelForm: FC<IProps> = ({
  categories,
  content,
  edit,
  novelId,
  onOpenChange,
}) => {
  const session = useClientSession();
  const [isUploadSmallImage, setIsUploadSmallImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>(content?.image ?? "");
  const [tags, setTags] = useState<Tag[]>(content?.other_names ?? []);
  const form = useForm<LightnovelCreateSchema>({
    resolver: zodResolver(lightnovelCreateSchema),
    defaultValues: {
      name: content?.name ?? "",
      illustrator: content?.illustrator ?? "",
      author: content?.author ?? "",
      categories: content?.categories ?? [],
      image: content?.image ?? undefined,
      note: content?.note ?? undefined,
      other_names: content?.other_names ?? [],
      summary: content?.summary ?? undefined,
      user_id: +session?.user.id!,
    },
  });

  const pathName = usePathname();
  const router = useRouter();
  const [isPending, startTransiton] = useTransition();

  function onSubmit(values: LightnovelCreateSchema) {
    startTransiton(async () => {
      if (edit && novelId) {
        // const res = await editLightnovel(
        //   novelId,
        //   JSON.stringify(values),
        //   pathName
        // );
        // if (res.code !== 200) {
        //   toast.error(res?.message);
        // } else {
        //   toast.success(res?.message);
        //   if (onOpenChange) {
        //     onOpenChange(false);
        //   }
        // }
      } else {
        console.log(values);
        // const res = await createLightnovel(JSON.stringify(values));

        const result = await createLightnovel(JSON.stringify(values));

        console.log(result);

        // if (res?.code !== 200) {
        //   toast.error(res?.message)
        // } else {
        //   toast.success(res?.message, {
        //     description: res.submess
        //   })
        //   router.push(`/lightnovels/lightnovel/${res.data?.id}`)
        // }
      }
    });
  }

  const handleUploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    endpoint: "smallImage"
  ): Promise<ClientUploadedFileData<{
    uploadedBy: string;
  }> | null> => {
    if (!e.target.files) return null;
    setIsUploadSmallImage(true);

    // const result = await compressImage(e.target.files, 1);
    // if (image.key !== "") {
    //   await deleteFiles(image.key);
    // }
    const [res] = await uploadFiles(endpoint, { files: [e.target.files[0]] });

    setIsUploadSmallImage(false);

    return res;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="w-full space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên tác phẩm<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="other_names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tên tên khác<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Nhập tên khác"
                      tags={tags}
                      shape={"rounded"}
                      animation={"slideIn"}
                      truncate={10}
                      className="sm:min-w-[450px] py-5 rounded-xl"
                      setTags={(newTags) => {
                        setTags(newTags);
                        field.onChange(newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {categories && (
              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Thể loại<span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultiSelector
                        values={field.value}
                        onValuesChange={field.onChange}
                        loop
                        className="w-full"
                      >
                        <MultiSelectorTrigger>
                          <MultiSelectorInput placeholder="Chọn thể loại" />
                        </MultiSelectorTrigger>
                        <MultiSelectorContent>
                          <MultiSelectorList>
                            {categories.map((category) => {
                              return (
                                <MultiSelectorItem
                                  value={category}
                                  key={`category - ${category}`}
                                >
                                  {category}
                                </MultiSelectorItem>
                              );
                            })}
                          </MultiSelectorList>
                        </MultiSelectorContent>
                      </MultiSelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tác giả<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="illustrator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hoạ sĩ</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tóm tắt<span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      contentFor="summary"
                      contentType="lightnovel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full flex flex-col gap-6">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh tác phẩm</FormLabel>
                  <FormControl>
                    <Dropzone
                      type="file"
                      accept="image/*"
                      id="dropzone-file"
                      disabled={isUploadSmallImage}
                      value={image}
                      onChange={async (
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const res = await handleUploadImage(e, "smallImage");
                        if (!res) return;
                        field.onChange(res.url);
                        setImage(res.url);
                      }}
                    />
                  </FormControl>
                  <FormDescription>Ảnh dạng đứng</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ghi chú</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      contentFor="note"
                      contentType="lightnovel"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            rounded={"full"}
            className="min-w-[120px]"
          >
            {isPending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {edit ? "Chỉnh sửa" : "Đăng"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateLightnovelForm;
