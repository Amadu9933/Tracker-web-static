const rating = (total_delivery: number, total_assigned_orders: number) => {
    if (total_assigned_orders === 0) {
        return 0;
    }
    const ratingValue = (total_delivery / total_assigned_orders) * 5;
    return Math.round(ratingValue * 10) / 10; // Round to 1 decimal place
};

export default rating;

export const average_riders_rating = (riders: any[]) => {
    const validRatings = riders.filter(r => r.total_assigned_orders > 0);
    if (validRatings.length === 0) {
        return 0;
    }
    const totalRating = validRatings.reduce((sum, rider) => {
        const riderRating = rating(rider.total_delivery, rider.total_assigned_orders);
        return sum + riderRating;
    }, 0);
    return (totalRating / validRatings.length).toFixed(1); // Round to 1 decimal place
};