-- CreateTable
CREATE TABLE "Trending" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trending_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trending_productId_key" ON "Trending"("productId");

-- AddForeignKey
ALTER TABLE "Trending" ADD CONSTRAINT "Trending_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
