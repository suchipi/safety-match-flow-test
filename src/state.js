// @flow
import {
  makeTaggedUnion,
  none,
  type TaggedUnion,
  type MemberType,
} from "safety-match";

const stateDef = {
  on: (voltage: number): number => voltage,
  off: none,
};
export const State: TaggedUnion<typeof stateDef> = makeTaggedUnion(stateDef);
export type StateType = MemberType<typeof State>;
