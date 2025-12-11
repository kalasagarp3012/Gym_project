package com.gym.app.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workout_plans")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long planId;

    @ManyToOne
    @JoinColumn(name = "trainer_id", nullable = false)
    private Trainer trainer;

    private String title;

    @Enumerated(EnumType.STRING)
    private Level level;

    private String description;
    private Integer durationWeeks;

    public enum Level {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}
