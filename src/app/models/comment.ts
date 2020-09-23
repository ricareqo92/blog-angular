export class Comment {
    constructor(
        public id: number,
        public post_id: number,
        public description: string,
    ) {}
}