import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteProduct } from "~/hooks/useProducts";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteProduct } = useDeleteProduct(setOpen, open, refetch);

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    onClick={() => deleteProduct(open.id)}
                    title={"האם את/ה בטוח ?"}
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

