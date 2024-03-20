-- CreateTable
CREATE TABLE "sourcecodes" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "sourceCode" TEXT NOT NULL,
    "stdin" TEXT DEFAULT 'NA',
    "stdout" TEXT DEFAULT 'NA'
);

-- CreateIndex
CREATE UNIQUE INDEX "sourcecodes_id_key" ON "sourcecodes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "sourcecodes_username_key" ON "sourcecodes"("username");
