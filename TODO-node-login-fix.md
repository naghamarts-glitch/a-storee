# Node.js Login Fix - 403/CORS/JSON Tracker

## 🔍 Issues Found
- CORS: `localhost:8080` only (needs `:5173`)
- Frontend: `/api/users/login.php` → should be `/api/login` (Node.js)
- Backend Node.js login perfect: all `res.json()`

## ✅ Plan
1. Fix CORS origins
2. Update AuthContext endpoints to Node.js routes
3. Test `/api/login` endpoint

### Progress
- [ ] CORS fix
- [ ] Endpoint alignment
- [ ] Verify no auth middleware on login

