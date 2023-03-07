
export interface SomeRepository {
  fetchFoo(): Promise<string>;
}

export class SomeService {
  constructor(private readonly repo: SomeRepository) {}

  async getFoo() {
    return await this.repo.fetchFoo()
  }
}
