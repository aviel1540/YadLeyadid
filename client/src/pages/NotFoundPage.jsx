import { TitleTab } from '~/components';
import { NotFound } from '~/components/NotFound';

export const NotFoundPage = () => {
  return (
    <>
      <TitleTab title="404" key="notFound" />
      <NotFound />
    </>
  );
};
