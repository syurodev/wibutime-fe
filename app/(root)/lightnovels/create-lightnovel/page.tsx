import React from "react";

import { useServerSession } from "@/hooks/server/useServerSession";
import { notFound, redirect } from "next/navigation";
import { UserRoleEnum } from "@/common/enum/user-roles.enums";
import { UserPermissionsEnum } from "@/common/enum/user-permissions.enums";
import { getCategories } from "@/actions/lightnovel/get-lightnovel-categories.action";
import CreateLightnovelForm from "@/components/page/Lightnovels/CreateLightnovel/CreateLightnovelForm";

const CreateLightnovelPage = async () => {
  const session = await useServerSession();

  if (!session) {
    redirect("/not-permission");
  }

  if (
    !session.user.roles?.includes(UserRoleEnum.CREATER) &&
    !session.user.permissions?.includes(UserPermissionsEnum.UPLOAD)
  ) {
    redirect("/not-permission");
  }

  const categories = await getCategories();

  if (categories.status !== 200) {
    notFound();
  }

  console.log(session.backend_token.access_token);

  return (
    <div className="px-4 pt-[82px] showScroll overflow-y-auto h-full pb-4">
      <h1 className="font-semibold text-2xl mb-4">Tạo Lightnovel</h1>
      <CreateLightnovelForm categories={categories.data ?? []} />
    </div>
  );
};

export default CreateLightnovelPage;
