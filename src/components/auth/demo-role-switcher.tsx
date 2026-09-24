"use client";

import { useEffect, useState } from "react";
import { roleDefinitions } from "@/constants/role-permissions";
import { Role } from "@/enums/role";
import { authService } from "@/lib/services/auth-service";
import { Select } from "@/components/ui/input";

export function DemoRoleSwitcher() {
  const [role, setRole] = useState<Role>(Role.IT_ADMIN);

  useEffect(() => {
    const timer = window.setTimeout(() => setRole(authService.getCurrentRole()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function handleChange(value: Role) {
    setRole(authService.setCurrentRole(value));
    window.location.reload();
  }

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">Demo Role Preview</span>
      <Select value={role} onChange={(event) => handleChange(event.target.value as Role)} className="mt-2 border-white/20 bg-white/10 text-white focus:ring-white/20">
        {[Role.IT_ADMIN, Role.HOSPITAL_ADMIN, Role.FRONT_DESK, Role.PATIENT_COORDINATOR, Role.DOCTOR].map((item) => (
          <option key={item} value={item} className="text-slate-950">
            {roleDefinitions.find((definition) => definition.role === item)?.label}
          </option>
        ))}
      </Select>
    </label>
  );
}
