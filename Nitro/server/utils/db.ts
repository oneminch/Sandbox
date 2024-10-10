export const useDB = defineCachedFunction(
	async () => {
		const db = useDatabase();

		await db.sql`DROP TABLE IF EXISTS todos;`;
		await db.sql`CREATE TABLE IF NOT EXISTS todos ("id" TEXT PRIMARY KEY, "item" TEXT, "completed" TEXT);`;

		await db.sql`INSERT INTO todos (id, item, completed) VALUES (${useId()}, 'Read the Nitro guide', 'yes')`;
		await db.sql`INSERT INTO todos (id, item, completed) VALUES (${useId()}, 'Experiment with Nitro', 'yes')`;

		const { rows } =
			await db.sql`SELECT * FROM todos WHERE item LIKE '%Nitro%';`;

		return {
			rows
		};
	},
	{
		maxAge: 30,
		name: "todolist"
	}
);
