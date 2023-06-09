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
                    open={open}
                    setOpen={setOpen}
                    onClick={() => deleteMission(open.id)}
                    title={"האם אתה בטוח ?"}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        open={open}
                        setOpen={setOpen}
                        refetch={refetch}
                    />
                </PopUp>
            )}
        </>
    );
};

