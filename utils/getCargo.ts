import jwt_decode from "jwt-decode";

/**
 * Recupera as informações de carga do usuário armazenadas no localStorage.
 * @returns O valor da variável 'Cargo' armazenada no localStorage, ou null se a variável não for encontrada.
 */
export function getUserCargo(): string | null {
    let cargo: string | null = null;
    
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("Cargo");
        const decodedToken: JwtPayload = jwt_decode(token || "");
        cargo = decodedToken.cargo;
    }
    return cargo;
}
