import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteMission } from "~/hooks/useMission";

export const Actions = ({ setOpen, open, refetch }) => {
    const { title } = open

    const { mutate: deleteMission } = useDeleteMission(setOpen, open, refetch);

    const handleSubmit = () => {
        if (title === "delete") {
            deleteMission(open.id);
        }
        else if (title === 'cancel') {
            alert('cancel')
        }
    }

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    onClick={handleSubmit}
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

