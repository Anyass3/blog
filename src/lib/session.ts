export const authSession = new Map<string, App.Locals>();

export const clearAuthSession = async (session: string) => {
	if (Date.now() >= (authSession.get(session)?.expires ?? 0)) {
		authSession.delete(session);
	}
};
