-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "actividadFisica" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Padecimiento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Padecimiento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PadecimientosUsuarios" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "padecimientoId" TEXT NOT NULL,

    CONSTRAINT "PadecimientosUsuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alimento" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlimentosIncluirUsuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "alimentoId" TEXT NOT NULL,

    CONSTRAINT "AlimentosIncluirUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlimentosExcluirUsuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "alimentoId" TEXT NOT NULL,

    CONSTRAINT "AlimentosExcluirUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuGuardado" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "MenuGuardado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroIndicadoresUsuario" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "imc" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RegistroIndicadoresUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Padecimiento_nombre_key" ON "Padecimiento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Alimento_nombre_key" ON "Alimento"("nombre");

-- AddForeignKey
ALTER TABLE "PadecimientosUsuarios" ADD CONSTRAINT "PadecimientosUsuarios_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PadecimientosUsuarios" ADD CONSTRAINT "PadecimientosUsuarios_padecimientoId_fkey" FOREIGN KEY ("padecimientoId") REFERENCES "Padecimiento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentosIncluirUsuario" ADD CONSTRAINT "AlimentosIncluirUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentosIncluirUsuario" ADD CONSTRAINT "AlimentosIncluirUsuario_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "Alimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentosExcluirUsuario" ADD CONSTRAINT "AlimentosExcluirUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlimentosExcluirUsuario" ADD CONSTRAINT "AlimentosExcluirUsuario_alimentoId_fkey" FOREIGN KEY ("alimentoId") REFERENCES "Alimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuGuardado" ADD CONSTRAINT "MenuGuardado_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroIndicadoresUsuario" ADD CONSTRAINT "RegistroIndicadoresUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
