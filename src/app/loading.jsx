'use client';
import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-content-center bg-background/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
                
             
                <div className="relative flex items-center justify-center w-24 h-24">
                
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-ping duration-1000"></div>
                    
            
                    <div className="absolute inset-0 border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
                    
                 
                    <div className="z-10 text-primary text-4xl animate-bounce">
                        📚
                    </div>
                </div>

             
                <div className="text-center space-y-1">
                    <h2 className="text-2xl font-bold tracking-wider text-foreground">
                        Biblio<span className="text-primary">Drop</span>
                    </h2>
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">
                        Opening the pages... Please wait
                    </p>
                </div>

                
                <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-1/2 animate-shimmer bg-gradient-to-r from-primary/40 via-primary to-primary/40 [background-size:200%_100%]"></div>
                </div>

            </div>
        </div>
    );
};

export default Loading;