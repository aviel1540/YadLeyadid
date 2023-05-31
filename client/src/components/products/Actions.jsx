import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";
import { useDeleteProduct } from "~/hooks/useProducts";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMutateProduct } = useDeleteProduct(
        setOpen,
        open,
        refetch
    );

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    onClick={() => deleteMutateProduct(open.id)}
                    title={"האם אתה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        content={open.content}
                        title={open.title}
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            )}
        </>
    );
};

