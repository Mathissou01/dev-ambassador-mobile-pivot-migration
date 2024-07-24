export interface ApiResponseInterface<Type> {
  ok: boolean;
  result: Type;
}

export class ApiResponse<Type> {
  ok: boolean;
  result: Type;

  constructor(response?: ApiResponseInterface<Type>) {
    this.ok = response?.ok ?? false;
    this.result = response?.result ?? [] as Type;
  }
}

export class ApiResponseArray<Type> extends ApiResponse<Type[]> {}

export class EmptyApiResponse<Type> extends ApiResponse<Type> {
  constructor(defaultValue: Type) {
    super({ ok: true, result: defaultValue });
  }
}
