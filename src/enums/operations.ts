export enum AssignmentStatus {
  WAITING_ASSIGNMENT = "WAITING_ASSIGNMENT",
  ASSIGNED = "ASSIGNED",
  WAITING_DOCTOR = "WAITING_DOCTOR",
  CALLED = "CALLED",
  IN_CONSULTATION = "IN_CONSULTATION",
  COMPLETED = "COMPLETED",
}

export enum VisitStatus {
  APPOINTMENT_CONFIRMED = "APPOINTMENT_CONFIRMED",
  CHECKED_IN = "CHECKED_IN",
  WAITING_FOR_DOCTOR = "WAITING_FOR_DOCTOR",
  DOCTOR_ASSIGNED = "DOCTOR_ASSIGNED",
  CALLED = "CALLED",
  IN_CONSULTATION = "IN_CONSULTATION",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum QueueType {
  SERVICE = "SERVICE",
  DOCTOR = "DOCTOR",
}

export enum InternalTicketStatus {
  OPEN = "OPEN",
  ASSIGNED = "ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED",
  CANCELLED = "CANCELLED",
}

export enum TicketPriority {
  LOW = "LOW",
  NORMAL = "NORMAL",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export enum DoctorAvailability {
  AVAILABLE = "AVAILABLE",
  IN_CONSULTATION = "IN_CONSULTATION",
  OFF_DUTY = "OFF_DUTY",
}

export enum DoctorQueueStatus {
  WAITING = "WAITING",
  CALLED = "CALLED",
  IN_CONSULTATION = "IN_CONSULTATION",
  COMPLETED = "COMPLETED",
}

export enum DepartmentStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export enum AuditModule {
  RoleManagement = "Role Management",
  WebsiteAdmin = "Website Admin",
  InternalTicketing = "Internal Ticketing",
  QueueManagement = "Queue Management",
  VisitTracking = "Visit Tracking",
  PatientAssignment = "Patient Assignment",
  DoctorQueue = "Doctor Queue",
  DepartmentManagement = "Department Management",
  QueueConfiguration = "Queue Configuration",
  UserManagement = "User Management",
  Queue = "Queue",
  System = "System",
}

export enum AuditAction {
  UPDATE_PERMISSION = "UPDATE_PERMISSION",
  PUBLISH_CONTENT = "PUBLISH_CONTENT",
  CREATE_TICKET = "CREATE_TICKET",
  ASSIGN_TICKET = "ASSIGN_TICKET",
  REASSIGN_TICKET = "REASSIGN_TICKET",
  UPDATE_STATUS = "UPDATE_STATUS",
  CHECK_IN_VISIT = "CHECK_IN_VISIT",
  ASSIGN_DOCTOR = "ASSIGN_DOCTOR",
  REASSIGN_DOCTOR = "REASSIGN_DOCTOR",
  CALL_DOCTOR_QUEUE = "CALL_DOCTOR_QUEUE",
  START_CONSULTATION = "START_CONSULTATION",
  COMPLETE_CONSULTATION = "COMPLETE_CONSULTATION",
  CALL_TICKET = "CALL_TICKET",
  TRANSFER_TICKET = "TRANSFER_TICKET",
  COMPLETE_TICKET = "COMPLETE_TICKET",
  UPDATE_DEPARTMENT = "UPDATE_DEPARTMENT",
  UPDATE_QUEUE_CONFIG = "UPDATE_QUEUE_CONFIG",
  RESET_DEMO = "RESET_DEMO",
  UPDATE_USER_ROLE = "UPDATE_USER_ROLE",
}
