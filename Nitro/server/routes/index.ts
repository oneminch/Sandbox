export default eventHandler(async (event) => {
	const data = await useDB().catch((e) => console.error(e));

	return data;
});
