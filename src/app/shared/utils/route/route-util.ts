import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export abstract class RouteUtil {
  public static prepareQSParams(
    currentParams: Params,
    modifiedParams: any
  ): Params {
    const params: Params = {};

    //Preserve params of the activated route.
    Object.keys(currentParams).some((key) => {
      if (
        Object.keys(modifiedParams).filter((param) => param === key).length ===
        0
      ) {
        params[key] = currentParams[key];
      }
    });

    //Add modified params
    Object.keys(modifiedParams).some((key) => {
      if (modifiedParams[key] !== null) {
        params[key] = modifiedParams[key];
      }
    });

    return params;
  }

  /**
   * @Description
   * Creates an HttpParams object for http calls, based on an stringfied json objects
   * @param args
   * Array os stringfied JSON objects, each object atribute represents a parameter for the http call
   * Example: {"dateFrom":"2022-10-21", "dateTo":"2022-11-01"}
   * @returns
   */
  public static prepareHttpParams(params: Params): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).some((field) => {
      httpParams = httpParams.set(field, params[field]);
    });

    return httpParams;
  }
}
