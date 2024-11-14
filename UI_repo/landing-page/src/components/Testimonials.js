import React from 'react';
import './Testimonials.css';

function Testimonials() {
    return (
        <section className="testimonials-section">
            <h2>Your Voice Matters Here</h2>
            <p>Hear how AccessNYC transforms travel for wheelchair users in the metro system.</p>
            <div className="testimonial-card">
                <img src="Wheelchairimg.jpg" alt="Jessica Dean" className="testimonial-image" />
                <div className="testimonial-content">
                    <p className="testimonial-text">
                        "Navigating the NYC metro system used to be a daunting task with my wheelchair. AccessNYC has revolutionized this experience for me. The app's real-time updates on elevators and escalators, coupled with accessible route planning, have brought a level of freedom I never imagined possible. Public transportation is no longer a barrier but an avenue of opportunity."
                    </p>
                    <p className="testimonial-author">Jessica Dean, Accessibility Advocate at Mobility NYC</p>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;