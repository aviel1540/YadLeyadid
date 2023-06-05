import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";
import { useDeleteMission } from "~/hooks/useMission";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMission } = useDeleteMission(setOpen, open, refetch);

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    onClick={() => deleteMission(open.id)}
                    title={"האם אתה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                        content={open.content}
                    />
                </PopUp>
            )}
        </>
    );
};

