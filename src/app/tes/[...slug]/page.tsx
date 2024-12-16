const SlugPage = async ({ params }: { params: { slug: string } }) => {
  return <div>Slug: {params.slug}</div>;
};

export default SlugPage;
