-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "items" TEXT NOT NULL,
    "pageSettings" TEXT NOT NULL,
    "nextId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
