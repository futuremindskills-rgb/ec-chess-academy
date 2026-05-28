import BlogDetailPage, {generateMetadata as generateBlogMetadata} from "../../../blog/[slug]/page";
import type {Metadata} from "next";

type Props = {
  params: {locale: string; slug: string};
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = params;
  return generateBlogMetadata({params: {slug}});
}

export default BlogDetailPage;
