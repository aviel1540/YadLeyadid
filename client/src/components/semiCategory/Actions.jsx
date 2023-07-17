import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteSemiCategory, useUnassignProductToSemiCategory } from "~/hooks/useSemiCategory";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteSemiCategory } = useDeleteSemiCategory(setOpen, open, refetch);
    const { mutate: unassignProductToSemiCategory } = useUnassignProductToSemiCategory(setOpen, open, refetch);

    const submitHandler = () => {
        if (open.title === "delete") {
            deleteSemiCategory(open.id);
        } else if (open.title === "delete-unassign") {
            const payload = {
                id: open.info._id,
                productId: open?.id,
            };
            unassignProductToSemiCategory(payload);
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

