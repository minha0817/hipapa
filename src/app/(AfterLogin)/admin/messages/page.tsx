"use client";
import styles from "./adminMessages.module.scss";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { AddAdminMessagesModal } from "@/components/adminMessages/addAdminMessagesModal/addAdminMessagesModal.component";
import { AdminMessagesTable } from "@/components/adminMessages/adminMessagesTable/adminMessagesTable.component";
import { getChildren } from "@/app/api/get";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Child } from "@/dbModels/types";

const adminMessagesPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [children, setChildren] = useState<Child[]>([]);

  const daycareId = children[0]?.daycare_id;

  const supabase = createClientComponentClient();

  useEffect(() => {
    getChildren(supabase).then(setChildren);
  }, [supabase]);

  return (
    <div className={styles.adminMessages}>
      <Modal opened={opened} onClose={close} title="Compose Messages">
        <AddAdminMessagesModal childrenList={children} close={close} />
      </Modal>
      <h1>Messages</h1>
      <Button variant="light" color="green" onClick={open}>
        Compose Messages
      </Button>
      <AdminMessagesTable daycareId={daycareId}/>
    </div>
  );
};

export default adminMessagesPage;
