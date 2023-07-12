import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteMission } from "~/hooks/useMission";
import { useExtensionRequestAnswer } from "~/hooks/useProducts";

export const Actions = ({ setOpen, open, refetch }) => {
    const { title, id } = open

    const { mutate: deleteMission } = useDeleteMission(setOpen, open, refetch);
    const { mutate: extensionRequestAnswer } = useExtensionRequestAnswer(setOpen, open, refetch);

    const handleSubmit = () => {
        if (title === "delete") {
            deleteMission(id);
        }
        else if (title === 'cancel') {
            const payload = { id, answer: false }
            extensionRequestAnswer(payload)
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

