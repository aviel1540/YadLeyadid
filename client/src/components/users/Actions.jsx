import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteUser, useUnassignProductToUser } from "~/hooks/useUsers";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteUser } = useDeleteUser(setOpen, open, refetch);
    const { mutate: unassignProductToUser } = useUnassignProductToUser(setOpen, open, refetch);

    const submitHandler = () => {
        if (open.title === "delete") {
            deleteUser(open.id);
        } else if (open.title === "delete-unassign") {
            const payload = {
                userId: open.info._id,
                productId: open?.id,
            };
            unassignProductToUser(payload);
        }
    };

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    title={"האם את/ה בטוח ?"}
                    onClick={submitHandler}
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

