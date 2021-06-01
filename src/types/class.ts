enum SHIFT {
  fulltime = "fulltime",
  night = "-na-night",
}

export type labenuClass = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  shift: SHIFT;
  module: number;
};
