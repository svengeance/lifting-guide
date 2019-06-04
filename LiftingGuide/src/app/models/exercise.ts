import { ExerciseType } from './enums/exercise-type.enum';
import { BodyHalf } from './enums/body-half.enum';

export interface Exercise {
    bodyHalf: 'Upper' | 'Lower';
    exerciseType: ExerciseType;
    name: string;
    sets: number;
    reps: number;
    primaryMuscles: string[];
    secondaryMuscles: string[];
    notes: string[];
    imageUrl: string;
    exampleUrlPrimary?: string;
    exampleUrlSecondary?: string;
}
