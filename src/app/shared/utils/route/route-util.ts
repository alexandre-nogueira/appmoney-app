import { ActivatedRoute, Params } from '@angular/router';

export abstract class RouteUtil {
  public static prepareRouteParams(
    activatedRoute: ActivatedRoute,
    params: any
  ) {
    const retParams: string[] = [];

    //Preserve params of the activated route.
    Object.keys(activatedRoute.snapshot.params).some((key) => {
      if (Object.keys(params).filter((param) => param === key).length === 0) {
        retParams.push(`{"${key}": "${activatedRoute.snapshot.params[key]}"}`);
      }
    });

    //Add changed params.
    Object.keys(params).some((key) => {
      retParams.push(`{"${key}":"${params[key]}"}`);
    });

    return retParams;
  }

  public static formatRouteParams(unformatedParams: string[]): Params {
    const qs: Params = {};
    unformatedParams.forEach((param) => {
      const paramObj = JSON.parse(param);
      Object.keys(paramObj).some((key) => {
        qs[key] = paramObj[key];
      });
    });
    return qs;
  }
}
