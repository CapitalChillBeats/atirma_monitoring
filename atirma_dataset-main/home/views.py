from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
import csv
import json
from django.views.decorators.csrf import csrf_exempt
import boto3
import pandas as pd
import sys

access_key  = 'AKIA4DQTD2THOFSDU3LB'
secret_key = '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'
bucket_name = "ledger-logging"
object_name = "[2023-11-15].csv"

if sys.version_info[0] < 3: 
    from StringIO import StringIO # Python 2.x
else:
    from io import StringIO


def send_aws_request(bucket_name, object_name):
    s3_client = boto3.client("s3", aws_access_key_id=access_key, 
                             aws_secret_access_key=secret_key)

    # Read an object from the bucket
    response = s3_client.get_object(Bucket= bucket_name, 
                                    Key=object_name)
    return response


def home(request):
    # Read the object’s content as text
    response = send_aws_request(bucket_name, object_name)
    object_content = response["Body"].read().decode("utf-8")
    df = pd.read_csv(StringIO(object_content))
    new_df = df.to_json(orient='records', lines=True)
    return JsonResponse(new_df, safe=False)


def convert_data_json(data):

    jsonArray = []
    for idx in range(len(data)):
        jsonArray.append({
            'date':data['date'][idx],
            'dataset':data['dataset'][idx],
            'metric':data['metric'][idx],
            'value':data['value'][idx]
        })
    return jsonArray


@csrf_exempt
def get_dataset_data(request):
    response = send_aws_request(bucket_name, object_name)
    object_content = response["Body"].read().decode("utf-8")
    df = pd.read_csv(StringIO(object_content))
    json_data = convert_data_json(df)
   # new_df = df.to_json(orient='records', lines=True)
    return JsonResponse(json_data, safe=False)

    # with open('media/_2023-11-15_.csv', mode ='r')as file:
    #     # reading the CSV file
    #     csvFile = csv.reader(file)
    #     jsonArray = convert_data_json(csvFile)
    # jsonString = json.dumps(jsonArray)
    # return JsonResponse(jsonArray[1:], safe=False)









