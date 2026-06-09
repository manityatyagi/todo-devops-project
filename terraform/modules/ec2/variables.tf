variable "aws_region" {
    description = "it is the region for the ec2 instance and other resources"
    type = string
}

variable "env" {
    description = "it is the environment for the resources"
    type = string
}

variable "ami" {
    description = "it is the ami for the ec2 instance"
    type = string
}

variable "sg_cidr_block" {
    description = "it is the cidr block range for the ingress and egress rules"
    type = list(string)
}

variable "vpc_id" {
    description = "it is the vpc id for the ec2 instance"
}

variable "subnet_id" {
    description = "it is the subnet id for the ec2 instance"
}

# variable "instance_type" {
#     description = "it is the instance type for the ec2 instance"
#     type = string
# }
