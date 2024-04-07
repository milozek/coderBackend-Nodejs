function authMiddleware(roles) {
    return (req, res, next) => {
        const token = req.user.role;

        if (!token) {
            return res.status(401).json({ message: "Autenticación requerida" });
        }

        try {
            // Verificar el rol del usuario
            if (!roles.includes(token)) {
                return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" });
            }
            console.log("Está autorizado");
            next();
        } catch (error) {
            console.error("Error de autenticación:", error);
            return next(error); // Pasa el error al siguiente middleware de manejo de errores
        }
    };
}

export default authMiddleware;
