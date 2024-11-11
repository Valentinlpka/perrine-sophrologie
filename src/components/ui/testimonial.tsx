import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

// Import your images
import avatarImage from '@/assets/images/logo.png'; // Adjust the filename as needed
import avatarImage1 from '@/assets/images/photo.png'; // Adjust the filename as needed

const testimonials = [
    {
        content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        author: "Charly Hennard",
        position: "Gérant POMPES FUNEBRES HENNARD",
        avatar: avatarImage,
    },
    {
        content: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        author: "Charly Hennard",
        position: "Gérant POMPES FUNEBRES HENNARD",
        avatar: avatarImage1,
    },
    // Add more testimonials here...
];

const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoplay, setIsAutoplay] = useState(true);
    const [fade, setFade] = useState(false);

    const nextTestimonial = useCallback(() => {
        setFade(true);
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
            setFade(false);
        }, 500); // Half of the transition duration
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoplay) {
            interval = setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds
        }
        return () => clearInterval(interval);
    }, [isAutoplay, nextTestimonial]);

    const handleDotClick = (index: number) => {
        if (index !== currentIndex) {
            setFade(true);
            setTimeout(() => {
                setCurrentIndex(index);
                setFade(false);
            }, 500); // Half of the transition duration
        }
        setIsAutoplay(false); // Stop autoplay when user interacts
    };

    return (
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-white">
                <CardContent className="pt-6">
                    <Quote className="text-orange-400 w-8 h-8 sm:w-12 sm:h-12 mb-4" />
                    <div className={`transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}>
                        <p className="text-gray-600 mb-6 text-sm sm:text-base">
                            {testimonials[currentIndex].content}
                        </p>
                        <div className="flex items-center">
                            <Avatar className="h-10 w-10 sm:h-12 sm:w-12 mr-3 sm:mr-4">
                                <Image
                                    src={testimonials[currentIndex].avatar}
                                    alt={`Avatar of ${testimonials[currentIndex].author}`}
                                    width={48}
                                    height={48}
                                />
                                <AvatarFallback>PFH</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold text-sm sm:text-base">{testimonials[currentIndex].author}</p>
                                <p className="text-xs sm:text-sm text-gray-500">{testimonials[currentIndex].position}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-center mt-4 space-x-2">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? 'bg-orange-400' : 'bg-gray-300 hover:bg-orange-200'
                            }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialSlider;