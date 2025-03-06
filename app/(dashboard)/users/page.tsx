'use client';

import { useEffect } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useUserStore } from 'app/store/userStore';
import { AvatarSmall } from 'app/components/layout/AvatarSmall';

export default function StatsPage() {
  const { users, currentPage, totalPages, fetchUsers, toggleUserStatus } =
    useUserStore();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [fetchUsers, currentPage]);

  return (
    <Card className="rounded-none">
      <CardHeader>
        <CardTitle>Usuarios</CardTitle>
        <CardDescription>Listado de usuarios registrados</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Tabla de Usuarios */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Creado</TableHead>
                {/* <TableHead>Última Actualización</TableHead> */}
                <TableHead>Estado</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    {/* Se oculta ID */}
                    <TableCell>
                      <AvatarSmall
                        src={user.image}
                        name={user.name}
                        email={user.email}
                      />
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${
                          user.role === 'ADMIN'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-500 text-white'
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>{user.country || 'N/A'}</TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), 'dd/MM/yyyy')}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-md text-sm ${
                          user.status === 'ACTIVE'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        {user.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => toggleUserStatus(user.id)}
                        variant="outline"
                      >
                        {user.status === 'ACTIVE' ? 'Inactivar' : 'Activar'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-sm">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Paginación */}
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => fetchUsers(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <Button
              onClick={() => fetchUsers(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
