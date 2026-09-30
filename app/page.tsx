"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [usuarios, setUsuarios] = useState<
        { id: number; nombre: string }[]
    >([]);

    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                return response.json();
            })
            .then((data) => {
                setUsuarios(data);
            })
            .catch((error) => {
                console.error(error);
                setError("No se pudieron cargar los usuarios");
            });
    }, []);

    return (
        <main>
            <h1>Usuarios</h1>

            {error && <p>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
