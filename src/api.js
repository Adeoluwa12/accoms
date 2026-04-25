const BASE = import.meta.env.VITE_API_BASE;

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  // Events
  getEvents: () => req('/events'),
  createEvent: (body) => req('/events', { method: 'POST', body }),
  activateEvent: (id) => req(`/events/${id}/activate`, { method: 'PATCH' }),
  deleteEvent: (id) => req(`/events/${id}`, { method: 'DELETE' }),

  // Attendees
  getAttendees: (params = {}) => req('/attendees?' + new URLSearchParams(params)),
  createAttendee: (body) => req('/attendees', { method: 'POST', body }),
  importAttendees: (body) => req('/attendees/import', { method: 'POST', body }),
  checkIn: (id) => req(`/attendees/${id}/checkin`, { method: 'POST' }),
  undoCheckIn: (id) => req(`/attendees/${id}/undo`, { method: 'POST' }),
  assignAttendee: (id, body) => req(`/attendees/${id}/assign`, { method: 'POST', body }),
  deleteAttendee: (id) => req(`/attendees/${id}`, { method: 'DELETE' }),

  // Units
  getUnits: (params = {}) => req('/units?' + new URLSearchParams(params)),
  getUnit: (id) => req(`/units/${id}`),
  createUnit: (body) => req('/units', { method: 'POST', body }),
  updateUnit: (id, body) => req(`/units/${id}`, { method: 'PATCH', body }),
  toggleUnit: (id) => req(`/units/${id}/toggle`, { method: 'PATCH' }),
  setLeader: (id, body) => req(`/units/${id}/leader`, { method: 'POST', body }),
  reservedAssign: (id, body) => req(`/units/${id}/reserved-assign`, { method: 'POST', body }),

  // Dashboard
  getActiveEvent: () => req('/dashboard/active-event'),
  getStats: (eventId) => req(`/dashboard/stats?eventId=${eventId}`),
  getOccupancy: (eventId, type) => req(`/dashboard/occupancy?eventId=${eventId}${type ? `&type=${type}` : ''}`),
  getDistribution: (eventId) => req(`/dashboard/distribution?eventId=${eventId}`),

  // Reports
  getAttendanceSheet: (params) => req('/reports/attendance?' + new URLSearchParams(params)),
  getRoomManifest: (eventId) => req(`/reports/room-manifest?eventId=${eventId}`),
  getUnassigned: (eventId) => req(`/reports/unassigned?eventId=${eventId}`),
};
