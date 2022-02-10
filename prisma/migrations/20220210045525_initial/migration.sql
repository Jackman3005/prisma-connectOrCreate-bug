-- CreateTable
CREATE TABLE "MyModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "itemId" TEXT,

    CONSTRAINT "MyModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MyModel_itemId_key" ON "MyModel"("itemId");

-- AddForeignKey
ALTER TABLE "MyModel" ADD CONSTRAINT "MyModel_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;
