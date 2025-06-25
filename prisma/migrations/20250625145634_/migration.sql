-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT,
    "mobile" TEXT,
    "gender" TEXT,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
