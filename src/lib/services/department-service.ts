import { departments } from "@/lib/mock/departments";

export const departmentService = {
  getDepartments: () => departments,
  getDepartmentById: (departmentId: string) => departments.find((department) => department.departmentId === departmentId),
};
