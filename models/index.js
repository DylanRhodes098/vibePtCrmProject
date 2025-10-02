// Import models //
import Gym from "./gym.js";
import User from "./user.js";
import Member from "./member.js";
import PtMember from "./ptMember.js";
import TimeLine from "./timeLine.js";

// Map requested names to actual model names:
// - TimelineEntry => TimeLine

// Idempotent association setup to tolerate hot reloads
export function setupAssociations() {
  // Gym → User
  if (!Gym.associations || !Gym.associations.Users) {
    Gym.hasMany(User, { foreignKey: "gymId" });
  }
  if (!User.associations || !User.associations.Gym) {
    User.belongsTo(Gym, { foreignKey: "gymId" });
  }

  // Gym → Member
  if (!Gym.associations || !Gym.associations.Members) {
    Gym.hasMany(Member, { foreignKey: "gymId" });
  }
  if (!Member.associations || !Member.associations.Gym) {
    Member.belongsTo(Gym, { foreignKey: "gymId" });
  }

  // User (PT) → PTMember
  if (!User.associations || !User.associations.PtMembers) {
    User.hasMany(PtMember, { foreignKey: "ptId" });
  }
  if (!PtMember.associations || !PtMember.associations.pt) {
    PtMember.belongsTo(User, { as: "pt", foreignKey: "ptId" });
  }

  // Member → PTMember
  if (!Member.associations || !Member.associations.PtMembers) {
    Member.hasMany(PtMember, { foreignKey: "memberId" });
  }
  if (!PtMember.associations || !PtMember.associations.Member) {
    PtMember.belongsTo(Member, { foreignKey: "memberId" });
  }

  // PTMember → TimelineEntry (TimeLine)
  if (!PtMember.associations || !PtMember.associations.TimeLines) {
    PtMember.hasMany(TimeLine, { foreignKey: "ptMemberId" });
  }
  if (!TimeLine.associations || !TimeLine.associations.PtMember) {
    TimeLine.belongsTo(PtMember, { foreignKey: "ptMemberId" });
  }

  // User (PT) → TimelineEntry (TimeLine) via createdBy
  if (!User.associations || !User.associations.TimeLines) {
    User.hasMany(TimeLine, { foreignKey: "createdBy" });
  }
  if (!TimeLine.associations || !TimeLine.associations.User) {
    TimeLine.belongsTo(User, { foreignKey: "createdBy" });
  }
}

// Eagerly set up associations once on module load to keep behavior consistent
setupAssociations();

export { Gym, User, Member, PtMember, TimeLine };


